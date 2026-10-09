const crypto = require('node:crypto');

const Application = require('@waline/vercel');

module.exports = Application({
  avatarUrl(comment) {
    // some legacy records have neither mail nor email, which crashes the
    // built-in gravatar template (undefined.replace); build the url in JS
    const nick = String(comment.nick ?? comment.display_name ?? '');
    const mail = String(comment.mail ?? comment.email ?? '');

    if (/^[0-9]+$/.test(nick)) {
      return `https://q1.qlogo.cn/g?b=qq&nk=${nick}&s=100`;
    }

    if (/^[0-9]+@qq.com$/i.test(mail)) {
      return `https://q1.qlogo.cn/g?b=qq&nk=${mail.replace('@qq.com', '')}&s=100`;
    }

    const hash = crypto
      .createHash('md5')
      .update(mail.trim().toLowerCase())
      .digest('hex');

    return `https://seccdn.libravatar.org/avatar/${hash}`;
  },
  async postSave(comment) {
    // do what ever you want after save comment
  },
});
