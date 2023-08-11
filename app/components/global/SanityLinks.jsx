import {Link} from '@remix-run/react';
import {sanityReferenceToUrl} from '~/utils/utils';

export default function SanityLink({children, data, ...rest}) {
  const url = sanityReferenceToUrl(data);
  return (
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
}
