import puppeteer from "puppeteer-extra";
import mysql from "mysql";




const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "quorabot",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Database connected successfully!");
  connection.release(); // Release the connection
});


const runPrompt = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
      top_p: 1,
      temperature: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return "Error occurred";
  }
};


let titles = "";


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://quora.com/");

  await page.waitForSelector("#email", { visible: true });
//email and password
  await page.type("#email", "put email here");
  await page.type("#password", "put password here ");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  await page.click(
    'button.q-click-wrapper.qu-active--textDecoration--none.qu-focus--textDecoration--none.qu-borderRadius--pill.qu-alignItems--center.qu-justifyContent--center.qu-whiteSpace--nowrap.qu-userSelect--none.qu-display--inline-flex.qu-bg--blue.qu-tapHighlight--white.qu-textAlign--center.qu-cursor--pointer.qu-hover--textDecoration--none.ClickWrapper___StyledClickWrapperBox-zoqi4f-0.iyYUZT.base___StyledClickWrapper-lx6eke-1.hIqLpn[tabindex="4"][type="button"]'
  );

  await page.waitForNavigation();
//keyword
  await page.type(
    "#root > div > div.q-box > div > div.q-fixed.qu-fullX.qu-zIndex--header.qu-bg--raised.qu-borderBottom.qu-boxShadow--medium.qu-borderColor--raised > div > div:nth-child(2) > div > div.q-box.qu-flex--auto.qu-mx--small.qu-alignItems--center > div > div > form > div > div > div > div > div > input",
    "put the keyword here"
  );

  await new Promise((resolve) => setTimeout(resolve, 5000));

  await page.keyboard.press("Enter");

  await new Promise((resolve) => setTimeout(resolve, 9000));

  var i = 1;
  for (; i < 15; i++) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 9000)); // Wait for 5 seconds
      const elementHandle = await page.$(
        `#mainContent > div > div > div:nth-child(2) > div:nth-child(${i}) > span > a > div > div > div > div`
      );

      if (elementHandle) {
        await elementHandle.click();

        const target = await browser.waitForTarget(
          (target) =>
            target.opener() === page.target() && target.type() === "page"
        );

        // Switch Puppeteer's context to the new page
        const newPage = await target.page();

        await new Promise((resolve) => setTimeout(resolve, 5000));

        const url = await newPage.url();

        console.log(url);

        titles = await newPage.evaluate(() => {
          const titleElement = document.querySelector(
            "#mainContent > div.q-box.qu-borderAll.qu-borderRadius--small.qu-borderColor--raised.qu-boxShadow--small.qu-bg--raised > div > div.q-text.qu-dynamicFontSize--xlarge.qu-fontWeight--bold.qu-color--gray_dark_dim.qu-passColorToLinks.qu-lineHeight--regular.qu-wordBreak--break-word > span > span > div > div > div > span > span"
          );
          return titleElement
            ? titleElement.textContent.trim()
            : "Element not found";
        });

        console.log("Title:", titles);

        const queryCheck = 'SELECT * FROM quorabottable WHERE question = ?';
        pool.query(queryCheck, [titles], (error, results, fields) => {
          if (error) {
            console.error("Error checking if question exists:", error);
            return;
          }
          if (results.length != 0) {
            console.log("already answered");
            return;
          } else {
            // Proceed with insertion
            const queryInsert = 'INSERT INTO quorabottable (url, question) VALUES (?, ?)';
            pool.query(queryInsert, [url, titles], (error, results, fields) => {
              if (error) {
                console.error("Error inserting data:", error);
                return;
              } else {
                console.log("Data inserted successfully!");
              }
            });
          }
        });
       

        const prompt = `make the anwser long ${titles}`;
        const response = await runPrompt(prompt);
        console.log(response);
        

        await newPage.click(
          "#mainContent > div.q-box.qu-borderAll.qu-borderRadius--small.qu-borderColor--raised.qu-boxShadow--small.qu-bg--raised > div > div.q-box.qu-zIndex--action_bar > div > div > div:nth-child(1) > button.q-click-wrapper.qu-active--textDecoration--none.qu-focus--textDecoration--none.qu-borderRadius--pill.qu-alignItems--center.qu-justifyContent--center.qu-whiteSpace--nowrap.qu-userSelect--none.qu-display--inline-flex.qu-tapHighlight--white.qu-textAlign--center.qu-cursor--pointer.qu-hover--textDecoration--none.qu-hover--bg--darken.ClickWrapper___StyledClickWrapperBox-zoqi4f-0.iyYUZT.base___StyledClickWrapper-lx6eke-1.fJHGyh > div"
        );
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds

        await newPage.type(
          "#root > div > div:nth-child(2) > div > div > div > div > div.q-flex.ModalContainerInternal___StyledFlex-s8es4q-2.gXhqYs.modal_content_inner.qu-flexDirection--column.qu-bg--white.qu-overflowY--auto.qu-borderAll.qu-alignSelf--center > div > div.q-flex.qu-flexDirection--column.qu-overflowY--auto > div.q-relative.qu-display--flex.qu-flexDirection--column > div > div.q-box > div:nth-child(2) > div > div > div > div > div.q-box > div",
          response
        );

        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds

        const [filechooser] = await Promise.all([
          newPage.waitForFileChooser(),
          newPage.click(
            "#modal_footer_portal_container > div > div > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
          ),
        ]);

        await new Promise((resolve) => setTimeout(resolve, 9000));

        var a = 1;
        filechooser.accept([`${i}.png` || `${i}.jpg`]);

        await new Promise((resolve) => setTimeout(resolve, 9000));

        await newPage.click(
          "#root > div > div:nth-child(2) > div > div > div > div > div.q-flex.ModalContainerInternal___StyledFlex-s8es4q-2.gXhqYs.modal_content_inner.qu-flexDirection--column.qu-bg--white.qu-overflowY--auto.qu-borderAll.qu-alignSelf--center > div > div.q-flex.qu-flexDirection--column.qu-overflowY--auto > div.q-sticky.qu-bg--white.qu-borderTop > div > div.q-flex.qu-justifyContent--flex-end.qu-alignItems--center > button > div > div > div"
        );

        a++;

        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds

        await newPage.close();
      } else {
        console.log(`Element not found for index ${i}`);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

 
  await browser.close();
})();
