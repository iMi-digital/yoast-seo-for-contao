<?php

declare(strict_types=1);

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
        $objArticle = \ArticleModel::findByPk($dc->activeRecord->pid);

        $strKeyword = '';
        if ($objArticle) {
            $objPage = \PageModel::findByPk($objArticle->pid);
            if ($objPage && $objPage->keyword) {
                $strKeyword = $objPage->keyword;
            }
        }
        
        $GLOBALS['TL_MOOTOOLS'][] = '<script>window.yoastKeyword = '.json_encode($strKeyword).';</script>';
        $GLOBALS['TL_MOOTOOLS'][] = '<script type="module" src="bundles/imiyoastseoforcontao/assets/index.js"></script>';
        
        return $varValue;
    }
}
