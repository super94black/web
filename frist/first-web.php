<html>
<head>
	<title>homework</title>
	<?php
		echo '<link rel="stylesheet" type="text/css" href="./css.css">';
	?>
</head>
<body>
	<?php
		$arr = ["red","yellow","green"];
		function test_div($arr) {
			foreach($arr as $key=>$value) {
				echo "<div class='a' style='background-color:".$value."'></div>";
			}
		}
		test_div($arr);
	?>
</body>
</html>
