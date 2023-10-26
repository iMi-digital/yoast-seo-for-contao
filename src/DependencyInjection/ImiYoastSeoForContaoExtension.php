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

namespace Imi\YoastSeoForContao\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class ImiYoastSeoForContaoExtension extends Extension
{
    /**
     * @throws \Exception
     */
    public function load(array $configs, ContainerBuilder $container): void
    {

        $loader = new YamlFileLoader(
            $container,
            new FileLocator(__DIR__.'/../../config')
        );
        
        $loader->load('services.yaml');
    }
}
