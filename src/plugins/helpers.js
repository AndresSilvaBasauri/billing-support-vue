export default {
  convertObject(data) {
    var obj = {}
    Object.keys(data).forEach(function (key, index) {
      console.log(key);
      obj[key] = data[key];
    });
    return obj;
  }
}
