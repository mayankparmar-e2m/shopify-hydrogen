import CollectionItem from "./CollectionItem";

export function CollectionsGrid({ collections }) {
  return (
    <div className="collections-grid block md:flex md:items-center md:flex-wrap    md:gap-4">
      {collections.map((collection, index) => (
        <CollectionItem
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}
    </div>
  );
}