import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Set a longer navigation timeout (e.g., 60 seconds)
  

    // Navigate to Quora Arabic login page
    await page.goto('https://quora.com/');

    // Wait for the email input field to appear on the page
    await page.waitForSelector('#email', { visible: true });

    // Typing email and password
    await page.type('#email', 'Neypor7obi@gmail.com');
    await page.type('#password', 'Saad2002');

    // Wait for 5 seconds before clicking the login button
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Clicking on the login button
    await page.click('button.q-click-wrapper.qu-active--textDecoration--none.qu-focus--textDecoration--none.qu-borderRadius--pill.qu-alignItems--center.qu-justifyContent--center.qu-whiteSpace--nowrap.qu-userSelect--none.qu-display--inline-flex.qu-bg--blue.qu-tapHighlight--white.qu-textAlign--center.qu-cursor--pointer.qu-hover--textDecoration--none.ClickWrapper___StyledClickWrapperBox-zoqi4f-0.iyYUZT.base___StyledClickWrapper-lx6eke-1.hIqLpn[tabindex="4"][type="button"]');

    // Wait for navigation to complete after clicking login button
    await page.waitForNavigation();

    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.goto('https://ar.quora.com/%D9%85%D8%A7%D8%B0%D8%A7-%D9%8A%D8%B9%D9%86%D9%8A-%D9%84%D9%83-%D8%A7%D9%84%D8%A5%D8%AF%D9%85%D8%A7%D9%86');
    // Capture screenshot or perform other actions after login
    // await page.screenshot({ path: 'logged_in.png' });
    await new Promise(resolve => setTimeout(resolve, 5000));
    // Close the browser
    await page.click( "#mainContent > div.q-box.qu-borderAll.qu-borderRadius--small.qu-borderColor--raised.qu-boxShadow--small.qu-bg--raised > div > div.q-box.qu-zIndex--action_bar > div > div > div:nth-child(1) > button.q-click-wrapper.qu-active--textDecoration--none.qu-focus--textDecoration--none.qu-borderRadius--pill.qu-alignItems--center.qu-justifyContent--center.qu-whiteSpace--nowrap.qu-userSelect--none.qu-display--inline-flex.qu-tapHighlight--white.qu-textAlign--center.qu-cursor--pointer.qu-hover--textDecoration--none.qu-hover--bg--darken.ClickWrapper___StyledClickWrapperBox-zoqi4f-0.iyYUZT.base___StyledClickWrapper-lx6eke-1.fJHGyh");

    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.type( '#root > div > div:nth-child(2) > div > div > div > div > div.q-flex.ModalContainerInternal___StyledFlex-s8es4q-2.gXhqYs.modal_content_inner.qu-flexDirection--column.qu-bg--white.qu-overflowY--auto.qu-borderAll.qu-alignSelf--center > div > div.q-flex.qu-flexDirection--column.qu-overflowY--auto > div.q-relative.qu-display--flex.qu-flexDirection--column > div > div.q-box > div:nth-child(2) > div > div > div > div > div.q-box > div'
, 'SAAAAAAAAAAAADEDDDD');

})();

