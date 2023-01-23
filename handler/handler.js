"use strict";

const connectDatabase = require("../index");
const Note = require("../models/notesModel");

module.exports.create = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const { note } = JSON.parse(event.body);

    const newNote = await Note.create({ note });

    return {
      statusCode: 201,
      body: JSON.stringify({
        newNote,
      }),
    };
  } catch (err) {
    console.log("AN ERROR OCCURED", err);
    return {
      statusCode: 404,
      body: JSON.stringify({
        err,
      }),
    };
  }
};

module.exports.getNotes = async (event, context) => {
  try {
    await connectDatabase();
    const notes = await Note.find();
    console.log(notes);
    return {
      statusCode: 201,
      body: JSON.stringify({
        notes,
      }),
    };
  } catch (err) {
    console.log("AN ERROR OCCURED", err);
    return {
      statusCode: 404,
      body: JSON.stringify({
        err,
      }),
    };
  }
};

module.exports.getOne = async (event, context) => {
  try {
    await connectDatabase();
    const id = event.pathParameters.id;
    const note = await Note.findById(id);

    return {
      statusCode: 201,
      body: JSON.stringify({
        note,
      }),
    };
  } catch (err) {
    console.log("AN ERROR OCCURED", err);
    return {
      statusCode: 404,
      body: JSON.stringify({
        err,
      }),
    };
  }
};
