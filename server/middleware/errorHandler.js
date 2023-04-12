module.exports = (error, request, response, next) => {
  let status = 500;
  let message = "Internal Server Error";

  switch (error.name) {
    case "Invalid Name/Password":
      message = "Invalid Name/Password";
      status = 401;
      break;
    case "Name/Password Not Empty":
      message = "Name/Password is Required";
      status = 400;
      break;
    case "The Book is Being Borrowed":
      message = "The Book is Being Borrowed";
      status = 400;
      break;
    case "Forbiden":
      status = 403;
      message = "You are not authorized";
      break;
    case "Can only Borrow 2 Books":
      status = 403;
      message = "Can only Borrow 2 Books";
      break;
    case "can't borrow books":
      status = 403;
      message = "Can't Borrow Books";
      break;
    case "Not found":
      status = 404;
      message = "Data Not found";
      break;
    default:
      break;
  }
  response.status(status).json({ message: message });
};
