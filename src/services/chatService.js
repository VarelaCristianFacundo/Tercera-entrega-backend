const { darFecha } = require("../helpers/helpersFecha");
const Daos = require("../models/daos/factoryDb");

//Clase contenedora de chats y usuarios
let chats = Daos.chats;
let usuarios = Daos.usuarios;

//Logs
const logs = require("../logs/loggers");
const loggerError = logs.getLogger("error");

//Chat general
const idChatGral = "63c96f0bfe2bcb1ed087c332";

const getPublicChatService = async () => {
  try {
    const chatGral = await chats.getById(idChatGral);
    return chatGral;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPublicChatService");
  }
};

const postPublicMsgService = async (msg, tipo, email) => {
  try {
    const chatGral = await chats.getById(idChatGral);

    const newMessage = {
      timestamp: darFecha(),
      author: email,
      body: msg,
      tipo,
    };
    chatGral.messages.push(newMessage);
    await chats.update(chatGral);
    return chatGral.messages;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en postPublicMsgService");
  }
};

const getChatByEmailService = async (email) => {
  try {
    const chatGral = await chats.getById(idChatGral);
    const msgArray = chatGral.messages;
    const msgGral = msgArray.filter((element) => {
      if (element.author === email) {
        return element;
      }
    });
    return msgGral;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getChatByEmailService");
  }
};

const getPriveteChatByUserService = async (
  isAdmin,
  idChat = "",
  email = ""
) => {
  try {
    let chat = "";
    if (isAdmin) {
      const user = await usuarios.getByUser(email);
      chat = user.chat;
    } else {
      chat = idChat;
    }
    const chatUser = await chats.getById(chat);
    return chatUser;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPriveteChatByUserService");
  }
};

const postPrivateMessageService = async (
  msg,
  isAdmin,
  email,
  idChat = "",
  emailUser = ""
) => {
  try {
    let chat;
    let tipo;
    if (isAdmin) {
      const user = await usuarios.getByUser(emailUser);
      chat = user.chat;
      tipo = "sistema";
    } else {
      chat = idChat;
      tipo = "usuario";
    }

    const chatUser = await chats.getById(chat);

    const newMessage = {
      timestamp: darFecha(),
      author: `${email}`,
      body: msg,
      tipo,
    };
    chatUser.messages.push(newMessage);
    await chats.update(chatUser);
    return chatUser;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en postPrivateMessageService");
  }
};

module.exports = {
  getPublicChatService,
  postPublicMsgService,
  getChatByEmailService,
  getPriveteChatByUserService,
  postPrivateMessageService,
};
