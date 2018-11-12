import * as yup from "yup";
import { set, lensProp } from "ramda";

// schema
const schema = yup.object().shape({
  name: yup
    .string()
    .min(8)
    .max(20)
    .required(),
  password: yup
    .string()
    .min(8)
    .max(20)
    .required(),
  email: yup.string().email(),
  roles: yup.array().of(yup.string())
});

const userId = name => "org.couchdb.user:" + name;
const setId = user => {
  if (!user._id) {
    return set(lensProp("_id"), userId(user.name), user);
  }
  return user;
};

/*
  creates or updates a user

  @param {object} db - database object
  @param {object} user - user object
  @returns {Promise}
*/
const putUser = (db, user) => {
  return schema
    .validate(user)
    .then(setId)
    .then(set(lensProp("type"), "user"))
    .then(user => {
      console.log(user);
      return user;
    })
    .then(db.put);
};

export default putUser;
