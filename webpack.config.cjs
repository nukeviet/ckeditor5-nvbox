/**
 * NukeViet NVBox for CKEditor5
 * @version 4.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2024 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

'use strict';

/* eslint-env node */

const { builds } = require( '@ckeditor/ckeditor5-dev-utils' );
const webpack = require( 'webpack' );

module.exports = builds.getDllPluginWebpackConfig( webpack, {
	themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' ),
	packagePath: __dirname,
	manifestPath: require.resolve( 'ckeditor5/build/ckeditor5-dll.manifest.json' ),
	isDevelopmentMode: process.argv.includes( '--mode=development' ),
	tsconfigPath: require.resolve( 'ckeditor5/tsconfig.dll.json' )
} );
