import * as Alexa from 'ask-sdk';

export const InProgressGetNameHandler = {
    canHandle(handlerInput: Alexa.HandlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' && request.intent.name === 'GetNameIntent';
    },
    handle(handlerInput: Alexa.HandlerInput) {
      console.log("sessionAttributes", handlerInput.attributesManager.getSessionAttributes());
      return handlerInput.responseBuilder
        .speak('Cual es su nombre?')
        .reprompt('Cual es su nombre?')
        .getResponse();
    },
};

export const CompletedGetNameHandler = {
    canHandle(handlerInput: Alexa.HandlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
        && request.intent.name === 'GetNameIntent'
        && request.dialogState != 'COMPLETED';
    },
    handle(handlerInput: Alexa.HandlerInput) {
        const currentIntent = handlerInput.requestEnvelope.request['intent'];
        console.log("currentIntent", currentIntent);
        return handlerInput.responseBuilder
          .speak('Cual es su nombre?')
          .reprompt('Cual es su nombre?')
          .getResponse();
    }
}
