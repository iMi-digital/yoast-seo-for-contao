<?php

use Contao\CoreBundle\DataContainer\PaletteManipulator;

// Felddefinition
$GLOBALS['TL_DCA']['tl_page']['fields']['keyword'] = [
    'label'     => &$GLOBALS['TL_LANG']['tl_page']['keyword'],
    'exclude'   => true,
    'inputType' => 'text',
    'eval'      => ['maxlength' => 255, 'tl_class' => 'w50'],
    'sql'       => "varchar(255) NOT NULL default ''",
];

$paletteManipulator = PaletteManipulator::create()
    ->addField('keyword', 'robots', PaletteManipulator::POSITION_AFTER)
    ->applyToPalette('regular', 'tl_page');