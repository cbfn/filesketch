"use client";
import { useEffect, useState } from "react";

export function useGitHubStars(owner: string, repo: string) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.stargazers_count) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => setStars(null));
  }, [owner, repo]);

  return stars;
}
