# Yoast SEO integration for Contao

## What does it do
This package extends the Contao backend with the [Yoast SEO](https://github.com/Yoast/wordpress-seo/tree/trunk/packages/yoastseo#yoastseojs) plugin.

Every tinymce gets the Yoast SEO Results appended.
For the keyword (Keyphrase), an input field named `keyword` gets created under the edit view of the Page structure, this gets integrated in all articles under that Page structure.

This plugin also works with the [MetaModels](https://now.metamodel.me/) [Longtext](https://github.com/MetaModels/attribute_longtext) and [translated Longtext)(https://github.com/MetaModels/attribute_translatedlongtext) packages and automatically adds the SEO analysis to the TinyMCE widget in the input mask. You can also create an additional Text attribute with the column name `keyword` or `keyword_translated` for translated Text so that the SEO analysis also includes your own keywords as a reference.

## Example
![Preview of the Contao admin panel](doc/preview.png)
