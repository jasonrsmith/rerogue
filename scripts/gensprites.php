<?php

$ROWS = 12;
$COLS = 54;

$TILE_SIZE = 16;
$MARGIN_X = 1;
$MARGIN_Y = 1;

$SPRITE_PATH = $argv[1];
if (!$SPRITE_PATH) {
  die("Usage: {$argv[0]} <sprite-path>\n");
}


$total_sprites = $ROWS * $COLS;
$json = createJSONHash();
$css = createCSS();
$json_filename = "Rogue.json";
$css_filename = "Rogue.css";
logMsg("{$total_sprites} textures processed successfully");
file_put_contents($json_filename, json_encode($json, JSON_PRETTY_PRINT));
logMsg("Saved to {$json_filename}");
file_put_contents($css_filename, $css);
logMsg("Saved to {$css_filename}");


die();

function createCSS(){
  global $ROWS, $COLS, $TILE_SIZE, $SPRITE_PATH;
  $total_sprites = $ROWS * $COLS;
  //cycle through each sprite
  $i = 0;
  $css = "";
  while ($i < $total_sprites){
    $coords = getCoords($i);
    $css .= <<<EOT
 .t_{$i} {
 background:url('{$SPRITE_PATH}') no-repeat -{$coords->x}px -{$coords->y}px;
 width:{$TILE_SIZE}px;
 height:{$TILE_SIZE}px;
 }
EOT;
    $i++;
  }
  return $css;
}

function createJSONHash(){
  global $ROWS, $COLS, $TILE_SIZE, $MARGIN_X, $MARGIN_Y;
  $total_sprites = $ROWS * $COLS;
  $x = 0;
  $y = 0;
  $json = new stdClass();
  //build out the frames obj (contains all the images)
  $json->frames = new stdClass();
  //build out the meta object (just info about this program)
  $json->meta = new stdClass();
  //loop through all subtextures
  $i = 0;
  while ($i < $total_sprites){
    $tile_name = "t_" . $i;
    //make the right object, JSON arr would differ here
    $json->frames->{$tile_name} = new stdClass();
    //get coords
    $coords = getCoords($i);
    //make the frame object
    $frame_obj = new stdClass();
    $frame_obj->x = $coords->x;
    $frame_obj->y = $coords->y;
    $frame_obj->w = $TILE_SIZE;
    $frame_obj->h = $TILE_SIZE;
    //set the frame object
    $json->frames->{$tile_name}->frame = $frame_obj;

    //make the sprite source object
    $sprite_obj = new stdClass();
    $sprite_obj->x = 0;
    $sprite_obj->y = 0;
    $sprite_obj->w = $TILE_SIZE;
    $sprite_obj->h = $TILE_SIZE;
    //set the sprite source object
    $json->frames->{$tile_name}->spriteSourceSize = $sprite_obj;

    //make the source size object
    $source_obj = new stdClass();
    $source_obj->w = $TILE_SIZE;
    $source_obj->h = $TILE_SIZE;
    //set the sprite source object
    $json->frames->{$tile_name}->sourceSize = $source_obj;

    //add some more stuff that may or may not matter
    $json->frames->{$tile_name}->rotated = false;
    $json->frames->{$tile_name}->trimmed = false;

    //make the pivot object
    $pivot_obj = new stdClass();
    $pivot_obj->x = 0.5;
    $pivot_obj->y = 0.5;
    $json->frames->{$tile_name}->rotated = false;
    $i++;
  }
  $json->meta->sprites = $i;
  $json->meta->image = "roguelikeSheet_transparent.png";
  logMsg("The sprite sheet should be these dimensions - w:" . ($coords->x + $TILE_SIZE) . " h:" . ($coords->y + $TILE_SIZE));
  return $json;
}

function getCoords($i){
  global $ROWS, $COLS, $TILE_SIZE, $MARGIN_X, $MARGIN_Y;
  //get the x and y for sprite
  $returnObj = new stdClass();
  $returnObj->x = ($i % $COLS) * ($TILE_SIZE + $MARGIN_X);
  $returnObj->y = floor($i / $COLS) * ($TILE_SIZE + $MARGIN_Y);
  return $returnObj;
}

function logMsg ($message){
  echo "{$message}\n";
}
