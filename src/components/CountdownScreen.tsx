type CountdownScreenProps = {
  label: string;
};

export function CountdownScreen({ label }: CountdownScreenProps) {
  return (
    <main className="screen countdown-screen" aria-live="assertive">
      <div className="countdown-bubble">{label}</div>
    </main>
  );
}
