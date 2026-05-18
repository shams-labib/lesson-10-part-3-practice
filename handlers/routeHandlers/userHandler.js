/*
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/15/2020
 *
 */
// dependencies
const { hash, parseJSON } = require("../../helpers/utilities");
const data = require("../../lib/data");

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptMethod = ["get", "post", "put", "delete"];

  if (acceptMethod.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, callback);
  } else {
    callback(405, {
      message: "Method not allowed",
    });
  }
};

// 4 : scaffolding

handler._user = {};
handler._user.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName.trim()
      : false;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName.trim()
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone.trim()
      : false;
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password.trim()
      : false;
  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement === true
      ? true
      : false;
  console.log(firstName, lastName, phone, password, tosAgreement);

  if (firstName && lastName && phone && password && tosAgreement) {
    data.read("users", phone, (err, user) => {
      if (err) {
        let userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };

        data.create("users", phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              message: "User was created success",
            });
          } else {
            callback(500, {
              errors: "Couldn't create user",
            });
          }
        });
      } else {
        callback(500, {
          error: "error hoic create korar 83 number line e",
        });
      }
    });
  } else {
    callback(500, {
      error: "mal paoya jay nai",
    });
  }
};

handler._user.get = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone.trim()
      : false;

  if (phone) {
    data.read("users", phone, (err, u) => {
      const user = { ...parseJSON(u) };

      if (!err && user) {
        delete user.password;
        callback(200, user);
      } else {
        callback(404, {
          error: "Tomar prothom get ei jhamela ache dada",
        });
      }
    });
  } else {
    callback(404, {
      error: "Requested user not found",
    });
  }
};

handler._user.put = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone.trim()
      : false;
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName.trim()
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName.trim()
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password.trim()
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      // step-29 : so ekhane data.read function call hobe
      data.read("users", phone, (err, uData) => {
        const userData = parseJSON(uData);

        if (!err && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }

          if (lastName) {
            userData.lastName = lastName;
          }

          if (password) {
            userData.password = hash(password);
          }

          data.update("users", phone, userData, (err2) => {
            if (!err2) {
              callback(200, {
                message: "User was updated successfully",
              });
            } else {
              callback(500, {
                error: "Problem updating user",
              });
            }
          });
        } else {
          callback(404, {
            error: "User not found",
          });
        }
      });
    } else {
      callback(404, {
        error: "Your data have a problem, step 28",
      });
    }
  } else {
    callback(404, {
      error: "Invalid phone number, Please try again",
    });
  }
};
handler._user.delete = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone.trim()
      : false;

  if (phone) {
    data.read("users", phone, (err, userData) => {
      if (!err && userData) {
        data.delete("users", phone, (err2) => {
          if (!err2) {
            callback(200, {
              message: "Mal is deleted success",
            });
          } else {
            callback(404, {
              error: "mal short hoic mal khao",
            });
          }
        });
      } else {
        callback(404, {
          message: "fuck yess",
        });
      }
    });
  } else {
    callback(404, {
      error: "phone number not valid bokacoda",
    });
  }
};

module.exports = handler;
