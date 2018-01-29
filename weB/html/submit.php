<?php
// define variables and set to empty values
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = test_input($_POST["uname"]);
  $gender = test_input($_POST["gender"]);
  $divisions = test_input($_POST["divisions"]);
  $password = test_input($_POST["password"]);
  //$gender = test_input($_POST["gender"]);
  echo "LAUD";
  echo $name;
  echo $gender;
  echo $password;
  echo $divisions;
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>