import { Link, type LinkProps } from 'react-router-dom'; // Add 'type' here

export function ScrollLink({ children, ...props }: LinkProps) {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Link {...props} onClick={handleScroll}>
      {children}
    </Link>
  );
}