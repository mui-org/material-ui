import type { PropType } from './models';

export default function getTypeHash(type: PropType): string {
  switch (type.type) {
    case 'LiteralNode':
      return type.value.toString();
    case 'InstanceOfNode':
      return `${type.type}.${type.instance}`;
    case 'array':
      return `array(${getTypeHash(type.arrayType)})`;
    case 'InterfaceNode':
      return `interface(${[...type.types]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((t) => `${t[0]}:${getTypeHash(t[1])}`)
        .join(',')})`;
    case 'UnionNode':
      return `union(${[...type.types]
        .map((t) => getTypeHash(t))
        .sort((a, b) => a.localeCompare(b))
        .join(',')})`;
    default:
      return type.type;
  }
}
