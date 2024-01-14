export const GameGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// I+, O+, T+, S+, Z+, J+, and L+.

const iconT1 = [
  [0, 1, 0],
  [1, 1, 1],
];
const iconT2 = [
  [0, 1],
  [1, 1],
  [0, 1],
];
const iconT3 = [
  [1, 1, 1],
  [0, 1, 0],
];
const iconT4 = [
  [1, 0],
  [1, 1],
  [1, 0],
];

export const IconT = [iconT1, iconT2, iconT3, iconT4];

const iconJ1 = [
  [0, 1],
  [0, 1],
  [1, 1],
];
const iconJ2 = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 1],
];
const iconJ3 = [
  [1, 1],
  [1, 0],
  [1, 0],
];
const iconJ4 = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 0, 1],
];

export const IconJ = [iconJ1, iconJ2, iconJ3, iconJ4];

const iconL1 = [
  [1, 0],
  [1, 0],
  [1, 1],
];
const iconL2 = [
  [0, 0, 0],
  [1, 1, 1],
  [1, 0, 0],
];
const iconL3 = [
  [1, 1],
  [0, 1],
  [0, 1],
];
const iconL4 = [
  [0, 0, 0],
  [0, 0, 1],
  [1, 1, 1],
];

export const IconL = [iconL1, iconL2, iconL3, iconL4];

const iconO1 = [
  [1, 1],
  [1, 1],
];

export const IconO = [iconO1, iconO1, iconO1, iconO1];

const iconS1 = [
  [1, 0],
  [1, 1],
  [0, 1],
];
const iconS2 = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 1, 0],
];
const iconS3 = [
  [1, 0],
  [1, 1],
  [0, 1],
];
const iconS4 = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 1, 0],
];

export const IconS = [iconS1, iconS2, iconS3, iconS4];

const iconI1 = [[1], [1], [1], [1]];
const iconI2 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 1],
];

export const IconI = [iconI1, iconI2, iconI1, iconI2];

const iconZ1 = [
  [0, 1],
  [1, 1],
  [1, 0],
];
const iconZ2 = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 1, 1],
];
const iconZ3 = [
  [0, 1],
  [1, 1],
  [1, 0],
];
const iconZ4 = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 1, 1],
];

export const IconZ = [iconZ1, iconZ2, iconZ3, iconZ4];

export const IconPool = [IconI, IconO, IconT, IconS, IconZ, IconJ, IconL];
