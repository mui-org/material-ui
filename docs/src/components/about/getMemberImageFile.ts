export default function getMemberImageFile(member: { name: string }) {
  // Strip path separators to prevent traversal when the name builds a filesystem path.
  const slug = member.name.trim().toLowerCase().split(/\s+/).join('-').replace(/[/\\]/g, '');
  return `${slug}.png`;
}
