import * as Alexa from 'ask-sdk';
import { InProgressGetNameHandler, CompletedGetNameHandler } from './register_dialog';
// Logica de Dialogos
const LaunchRequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput: Alexa.HandlerInput) {
    return handlerInput.responseBuilder
      .speak('Bienvenido a Ejecutiva BBVA')
      .reprompt('En que puedo ayudarle?')
      .getResponse();
  },
};

const InProgressCreateAccountHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'PlanMyTripIntent' &&
      request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    return handlerInput.responseBuilder
      .addDelegateDirective(currentIntent)
      .getResponse();
  },
};

const GetCreateBBVAHandler = {
    canHandle: function (handlerInput: Alexa.HandlerInput) {
        var request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
        && request.intent.name === 'CreateAccountIntent'
        && request.dialogState !== 'COMPLETED';
    },
    handle: function (handlerInput: Alexa.HandlerInput) {
      const currentIntent = handlerInput.requestEnvelope.request['intent'];
      return handlerInput.responseBuilder
      .speak('Procedamos a crear una nueva cuenta en BBVA')
      .reprompt('Aun quiere crear una cuenta?')
      .addDelegateDirective(currentIntent)
      .getResponse();
    },
};

const HelpHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(HELP_MESSAGE)
        .reprompt(HELP_REPROMPT)
        .getResponse();
    },
};

const YesHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .addDelegateDirective('GetNameIntent')
      .getResponse();
  },
};


const ExitHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && (request.intent.name === 'AMAZON.CancelIntent'
          || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(STOP_MESSAGE)
        .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
      return handlerInput.responseBuilder.getResponse();
    },
};
//////
const SKILL_NAME = 'Ejecutiva';
const HELP_MESSAGE = 'Tu puedes decirme ejecutiva creame una cuenta o localizame los cajeros mas cercanos';
const STOP_MESSAGE = 'Adios, tenga un buen día';
const HELP_REPROMPT = 'En que puedo ayudarle?';

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
    .addRequestHandlers(
      LaunchRequestHandler,
      YesHandler,
      InProgressGetNameHandler,
      GetCreateBBVAHandler,
      InProgressGetNameHandler,
      CompletedGetNameHandler,
      HelpHandler,
      ExitHandler,
      SessionEndedRequestHandler
    )
    .addErrorHandlers(
      // ErrorHan
    )
    .lambda();