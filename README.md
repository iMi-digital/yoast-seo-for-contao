# Yoast SEO integration for Contao

## What does it do
This package extends the Contao backend with the [Yoast SEO](https://github.com/Yoast/wordpress-seo/tree/trunk/packages/yoastseo#yoastseojs) plugin.

Every tinymce gets the Yoast SEO Results appended.
For the keyword (Keyphrase), an input field named `keyword` gets created under the edit view of the Page structure, this gets integrated in all articles under that Page structure.

This Plugin also works with the [MetaModels](https://github.com/MetaModels/core) bundle and adds the SEO Results to every tinymce that is created with this bundle.
Here, you can create an extra filed named `keyword` or `keyword_translated` so that the SEO Results include the keyword search.

## Example
![Preview of the Contao admin panel](doc/preview.png)