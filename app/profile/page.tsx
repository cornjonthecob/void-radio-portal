export default function ProfilePage() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">My Profile</h1>
      <ul className="list-disc pl-5 text-sm">
        <li>Email</li>
        <li>Artist/Show name</li>
        <li>Real name</li>
        <li>Pronouns</li>
        <li>Phone</li>
        <li>Genres</li>
        <li>Instagram / SoundCloud / other socials</li>
      </ul>
      <p>Residents can edit only the fields above; other details come from the schedule.</p>
    </div>
  );
}
