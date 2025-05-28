export const verfiyConfig = {
  LengthError: (String.prototype.StringLength = function (string) {
    return string.length <= 0;
  }),
};
const obj = {
  "email": "testUser12@gmail.com",
  "password": "00000000"
}