interface PageProps {
  params: {
    user_name: string;
  };
}

export default function CommunityPage({ params }: PageProps) {
  return <div>Welcome to {params.user_name}'s community!</div>;
}