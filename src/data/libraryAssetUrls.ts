/** 思考库材料：GitHub Releases 附件直链 */

const RELEASE_AI =
  'https://github.com/leonardwwq/leonardwwq.github.io/releases/download/library-ai';

const RELEASE_USER_RESEARCH =
  'https://github.com/leonardwwq/leonardwwq.github.io/releases/download/library-user';

/** Release 附件文件名须与 GitHub 上传名完全一致 */
function releaseDownloadUrl(base: string, filename: string): string {
  return `${base}/${encodeURIComponent(filename)}`;
}

export const libraryAssetUrls = {
  calculusLifesaverMobi: releaseDownloadUrl(
    RELEASE_AI,
    'Calculus.lifesaver_.all.the.tools.you.need.to.--Adrian.Banner.mobi',
  ),
  deepLearningPdf: releaseDownloadUrl(
    RELEASE_AI,
    'Deep.learning--.Ian.Goodfellow.Yoshua.Bengio.Aaron.Courville.pdf',
  ),

  urDesigningDesign: releaseDownloadUrl(RELEASE_USER_RESEARCH, 'default.pdf'),
  urMicrointeractions: releaseDownloadUrl(RELEASE_USER_RESEARCH, '_13436851.pdf'),
  urDesignPsychology: releaseDownloadUrl(RELEASE_USER_RESEARCH, '-.A.pdf'),
} as const;
