/**
 * NukeViet NVBox for CKEditor5
 * @version 5.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2025 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

/**
 * @module nvbox/utils
 */

/**
 * Returns an extension from the given value.
 */
export function getFileExtension(fileName: string): string {
    const extensionRegExp = /\.(?<ext>[^.]+)$/;
    const match = fileName.match(extensionRegExp);

    return match!.groups!.ext.toLowerCase();
}

/**
 * Kiểm tra ext có phải là ảnh hay không
 */
export function extIsImage(ext: string): boolean {
    const listImageExts = [
        // Common images
        'png', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp',
        'apng', 'avif', 'svg', 'webp',
        // Should be avoided for web content
        'bmp', 'ico', 'cur', 'tif', 'tiff'
    ];
    return listImageExts.includes(ext);
}

/**
 * Kiểm tra ext có phải là video hay không
 */
export function extIsVideo(ext: string): boolean {
    const listVideoExts = [
        'mp4', 'mov', 'webm', 'ogg', '3gp', 'mpeg'
    ];
    return listVideoExts.includes(ext);
}

/**
 * Kiểm tra ext có phải là audio hay không
 */
export function extIsAudio(ext: string): boolean {
    const listAudioExts = [
        'mp3', 'wav', 'flac', 'aac'
    ];
    return listAudioExts.includes(ext);
}
