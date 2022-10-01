module.exports = {
    setupFiles: ["./jest.setup.js"],
    preset: 'react-native',
    transform: {
      '^.+\\.jsx$': 'babel-jest',
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: './tsconfig.spec.json',
        },
      ],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
  };