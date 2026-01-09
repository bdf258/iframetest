const genCsv = (objArray) => {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";
  var line = "";
  // header
  for (var index in array[0]) {
    var value = index + "";
    line += '"' + value.replace(/"/g, '""') + '",';
  }
  line = line.slice(0, -1);
  str += line + "\r\n";

  // data
  for (var i = 0; i < array.length; i++) {
    line = "";
    for (var ind in array[i]) {
      var val = array[i][ind] + "";
      if (val == "null") {
        val = "";
      }
      line += '"' + val.replace(/"/g, '""') + '",';
    }
    line = line.slice(0, -1);
    str += line + "\r\n";
  }
  return str;
};

export default genCsv;
