import { Bot, InlineKeyboard, InputFile, Keyboard } from "grammy";
import dotenv from "dotenv";
dotenv.config();

const API_TOKEN = process.env.API_TOKEN ? process.env.API_TOKEN : ""; // <-- put your bot token between the ""
const NAME = process.env.NAME ? process.env.NAME : ""; // <-- put your bot name between the ""
const LINK = process.env.LINK ? process.env.LINK : "";// <-- put your bot link between the ""

const bot = new Bot(API_TOKEN);

bot.command("start", async(ctx) => {
    const chatId = ctx.chatId;
    const content1 = "<b>¡Hola! 👋 ¿Cómo estás? Soy " + NAME + " 🤖 \n\n🔗 Contact: " + LINK + "</b>";
    //await ctx.replyWithPhoto(new InputFile("./BFA.svg"), { caption: "BFA.svg" });
    await bot.api.sendMessage(chatId, content1, {parse_mode: "HTML"});

    await bot.api.sendPhoto(chatId, new InputFile("./BFA.png"))
    // --------------------------- MENU 1 ---------------------------
        const inlineKeyboard = new InlineKeyboard()
            .text("🧱 Bloques", "option1").text("📝 Contratos Inteligentes", "option2").row()
            .text("📊 Monitoreo", "option3").text("🔒 Selladores", "option4").row()
            .text("🔧 Herramientas", "option5").text("🌐 Página web", "option6").row()
            .text("🛟 Ayuda", "option7")
        
        await ctx.reply("📌 Elegí en el menú principal el tema que quieras consultar. 👇", {
            reply_markup: inlineKeyboard,
        });
    // -----------------------------------------------------------------
    // --------------------------- MENU 2 ---------------------------
    /*
      const labels = [
        "Option 1",
        "Option 2",
        "Option 3",
      ];
      const buttonRows = labels
        .map((label) => [Keyboard.text(label)]);
      const keyboard = Keyboard.from(buttonRows).resized();

      await ctx.reply("📌 Menu 2", {
        reply_markup: keyboard,
      });
    */
    // -----------------------------------------------------------------

});

bot.on("message:entities", async (ctx) => {
    // Get all the entities.
    const entities = ctx.entities();
  
    // Get the first entity's text.
    entities[0].text;
  
    // Get email entities.
    const emails = ctx.entities("email");
  
    // Get phone and email entities.
    const phones = ctx.entities("phone_number");

    if(emails.length > 0){
        emails.map(async(email) => {
            await bot.api.sendMessage(ctx.chatId, "Email: " + email.text);
        });
    }

    if(phones.length > 0){
        phones.map(async(phone) => {
            await bot.api.sendMessage(ctx.chatId, "Phone: " + phone.text);
        });
    }
});

bot.on("message", async(ctx) => {
    // COMMON MESSAGE
    const chatId = ctx.chatId;
    const msgContent2 = "ENVIANDO HTML:";

    await bot.api.sendMessage(chatId, msgContent2);
    //----------------------------------------------------

    // HTML MESSAGE
    const htmlContent = '<b>Esto es un texto con html</b>';
    await bot.api.sendMessage(chatId, htmlContent, { parse_mode: "HTML" } );
    ////----------------------------------------------------

    // REPLY MESSAGE
    const msgIdReply = ctx.message.message_id;
    const msgContent = "pong: " + ctx.message.text;

    await ctx.reply(msgContent, {
        reply_parameters: {message_id: msgIdReply},
        //reply_markup: {force_reply: true} // Optional
    })
    //----------------------------------------------------

    // REACT MESAGGE IF TEXT IS "party"
    if(ctx.message.text == "party"){
        ctx.react("🎉")
    }
});

bot.on("edited_message", async(ctx) => {
    const chatId = ctx.chatId;
    const editedText = ctx.editedMessage.text ? ctx.editedMessage.text : "";
    await bot.api.sendMessage(chatId, "Edited text: " + editedText);
});

bot.on("message:new_chat_members:is_bot", async(ctx) => {
    const chatId = ctx.chatId;
    const content = "<b>👋 Hi !\n\n 🤖 I am " + NAME +  "\n\n 🔗 Contact: " + LINK + "</b>";
    //await ctx.replyWithPhoto(new InputFile("./BFA.svg"), { caption: "BFA.svg" });
    await bot.api.sendMessage(chatId, content, {parse_mode: "HTML"},);
});

bot.on("message:left_chat_member:me", async(ctx) => {
    console.log("Hacer algo antes de irme ...");
});

bot.start();