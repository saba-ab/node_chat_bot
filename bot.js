const { Telegraf } = require("telegraf");
const apiKey = "6013909830:AAH4TnrtcbL8mbDOvDLWo0teaV3dFHItXrg";
const bot = new Telegraf(apiKey);
// Start the Bot

// bot.start((ctx) => {
//   ctx.reply(`Hello ${ctx.from.first_name} Bot started successfully!`);
// });

// bot.help((ctx) => {
//   ctx.reply(`Hi how can i help you today ${ctx.from.first_name}?`);
// });

// bot.settings((ctx) => ctx.reply("you have opened settings."));

// bot.command(["chat", "Chat"], (ctx) => {
//   const username = ctx.from.first_name;
//   ctx.reply(`${username} you have entered chat mode.`);
// });

// bot.hears("cat", (ctx) => ctx.reply("meow"));

// bot.on("text", (ctx, next) => {
//   ctx.reply("handles every text message");
//   console.log(apple);
//   next(ctx);
// });

// bot.on("sticker", (ctx) => {
//   ctx.reply("handles sticker message.");
// });

// bot.mention("botfather", (ctx) => {
//   ctx.reply("handles botfather mentions.");
// });

// bot.hashtag("hash", (ctx) => {
//   ctx.reply("handles hashtags.");
// });

// bot.phone("+995568888068", (ctx) => {
//   ctx.reply("handles phone numbers");
// });

bot.use((ctx, next) => {
  ctx.state.apple = 12;
  ctx.reply("you have used bot.");
  next();
});

bot.start((ctx) => {
  ctx.reply(`${ctx.state.apple}`, {
    parse_mode: "MarkdownV2",
    disable_notification: true,
  });
  bot.telegram.sendMessage(ctx.chat.id, "telegram send message method");
});

bot.command("message", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    `hello ${ctx.chat.first_name} this is bot.telegram.sendMessage method in command message, extra parameters ar given in objects`,
    {
      parse_mode: "Markdown",
      disable_notification: true,
    }
  );
});
bot.command(["echo", "Echo"], (ctx) => {
  logger(ctx);
  const msg = ctx.message.text || {};
  const splitedMsg = msg.split(" ");
  splitedMsg.shift();
  const message = splitedMsg.join(" ");
  if (message) {
    bot.telegram.sendMessage(ctx.chat.id, `${message}`);
  } else {
    bot.telegram.sendMessage(
      ctx.chat.id,
      `${ctx.chat.first_name} use arguments for echo command`
    );
  }
});
function logger(ctx) {
  console.log(
    `[${new Date().toLocaleString()}] ${ctx.from.username} ${JSON.stringify({
      ...ctx,
    })}`
  ); // eslint-disable-line no
}

bot.launch();
