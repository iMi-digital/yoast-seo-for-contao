<?php

declare(strict_types=1);

/*
 * This file is part of Yoast SEO for Contao.
 *
 * (c) iMi digital GmbH 2023 <digital-dev@imi.de>
 * @license GPL-3.0-or-later
 * For the full copyright and license information,
 * please view the LICENSE file that was distributed with this source code.
 * @link https://github.com/imi/yoast-seo-for-contao
 */

namespace Imi\YoastSeoForContao;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class ImiYoastSeoForContao extends Bundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }

    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);
    }

    public function loadDataKeywordAttribute($varValue, \DataContainer $dc)
    {
        // Den aktuellen Artikel basierend auf der pid des Inhaltelements holen
        $objArticle = \ArticleModel::findByPk($dc->activeRecord->pid);

        $strKeyword = '';
        if ($objArticle) {
            $objPage = \PageModel::findByPk($objArticle->pid);
            if ($objPage && $objPage->keyword) {
                $strKeyword = $objPage->keyword;
            }
        }
        
        if (TL_MODE == 'BE') {
            $GLOBALS['TL_MOOTOOLS'][] = '<script>window.yoastKeyword = '.json_encode($strKeyword).';</script>';
            $GLOBALS['TL_MOOTOOLS'][] = '<script type="module" src="bundles/imiyoastseoforcontao/assets/index.js"></script>';
        }
        
        return $varValue;
    }
}
