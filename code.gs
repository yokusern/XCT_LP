/**
 * XCT LP - Google Apps Script Backend
 * 
 * 1. フォームデータをスプレッドシートへ追加
 * 2. Slackへ通知を送信
 */

const SLACK_WEBHOOK_URL = 'YOUR_SLACK_WEBHOOK_URL_HERE';
const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Organization', 'Name', 'Email', 'Plan', 'Message']);
    }

    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      params.org,
      params.name,
      params.email,
      params.plan,
      params.message
    ]);

    // Slack Notification
    sendSlackNotification(params);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendSlackNotification(data) {
  if (SLACK_WEBHOOK_URL === 'YOUR_SLACK_WEBHOOK_URL_HERE') return;

  const payload = {
    text: "🚀 *新規リード獲得通知 (XCT)*",
    attachments: [{
      color: "#D4AF37",
      fields: [
        { title: "企業・団体名", value: data.org, short: true },
        { title: "氏名", value: data.name, short: true },
        { title: "希望プラン", value: data.plan, short: true },
        { title: "Email", value: data.email, short: true },
        { title: "メッセージ", value: data.message, short: false }
      ]
    }]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(SLACK_WEBHOOK_URL, options);
}
