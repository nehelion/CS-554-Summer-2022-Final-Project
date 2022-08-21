class UnauthorizedRequest extends Error {
    constructor(message) {
      super(message);
      this.name = "Authorization Error";
      this.status = 401;
    }
}

module.exports = UnauthorizedRequest; 