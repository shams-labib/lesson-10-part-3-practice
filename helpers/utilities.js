/*
 * Title: utilities
 * Description: Handle all utilities function
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/20/2020
 *
 */

// dependencies

const crypto = require("crypto");
// step-18 : ekhane ebar environment ta niye ashbo
const environment = require("./environments");

// module scaffolding
const utilities = {};

// step-8 : ekhane amra etokisu kortesi karon amader prottekta error dhore dhore kaj korbo, amra ekhon user amader string e pathasse ki na seta check korbo and seta hole amra return kore dibo, ar na hole error ta jate user bujhte pare emn error return korbo

utilities.parseJSON = (jsonString) => {
  let output;

  //   step-9 : try catch er modde nicchi jate error ta dhorte pari
  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
  return output;
};

//step-16 : ekhane amra ekta function create kortesi, and etar kaj string niye setake hash kora

utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      // step-19: ekhane package.json e giye SET NODE_ENV set koro
      .createHmac("sha256", environment.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

// export module
module.exports = utilities;
