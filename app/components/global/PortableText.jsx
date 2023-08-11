import {PortableText as PortableTextReact} from '@portabletext/react';
import {useMemo} from 'react';
export default function PortableText({blocks, className}) {
  const components = {
    list: {
      bullet: ({children}) => <ul className={className}>{children}</ul>,
      number: ({children}) => <ol className={className}>{children}</ol>,
    },

    block: Block,
  };

  const portableText = useMemo(() => {
    return (
      <div className={className}>
        <PortableTextReact value={blocks} components={components} />
      </div>
    );
  }, [blocks]);

  return portableText;
}
function Block({children, value}) {
  if (value.style === 'h2') {
    return (
      <h2 className={'first:mt-0 last:mb-0 mb-4 mt-16 text-xl font-bold'}>
        {children}
      </h2>
    );
  }

  // Pragraphs
  return (
    <p className={'first:mt-0 last:mb-0 relative my-4 leading-paragraph'}>
      {children}
    </p>
  );
}
