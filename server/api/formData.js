const formData = require('./dummyFormData.json');

module.exports = {
  data: formData,
  answers: {},
  setData(newData) {
    this.data = newData;
  }
};
