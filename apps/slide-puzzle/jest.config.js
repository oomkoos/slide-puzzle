module.exports = {
  name: 'slide-puzzle',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/slide-puzzle',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
