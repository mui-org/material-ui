export interface Shape {
  borderRadius: number | string;
}

export type ShapeOptions = Partial<Shape>;

const shape = {
  borderRadius: 4,
};

export default shape as unknown as Shape;
