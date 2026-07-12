import { useState, useEffect, useCallback } from "react";
import { getMovieById, updateMovie } from "@/services/api/moviesApi";

const avatarFor = (name) =>
  `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`;

export const useMovie = (id) => {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getMovieById(id);
        if (!active) return;
        if (res) {
          setData(res);
          setComments(Array.isArray(res.comments) ? res.comments : []);
        } else {
          setError("Data not found");
        }
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const persist = useCallback(
    async (updated) => {
      setComments(updated);
      try {
        setPosting(true);
        await updateMovie(id, { ...data, comments: updated });
        setData((prev) => ({ ...prev, comments: updated }));
      } catch (err) {
        console.error("Failed to save comments:", err);
      } finally {
        setPosting(false);
      }
    },
    [id, data]
  );

  const addComment = useCallback(
    (values) => {
      const newComment = {
        id: `c${Date.now()}`,
        userId: `u${Date.now()}`,
        username: values.username,
        userAvatar: avatarFor(values.username),
        rating: values.rating ? Number(values.rating) : null,
        content: values.content,
        likes: 0,
        dislikes: 0,
        timestamp: new Date().toISOString(),
        isSpoiler: values.isSpoiler || false,
        isEdited: false,
        replies: [],
      };
      persist([newComment, ...comments]);
    },
    [comments, persist]
  );

  const addReply = useCallback(
    (commentId, values) => {
      const reply = {
        id: `r${Date.now()}`,
        userId: `u${Date.now()}`,
        username: values.username,
        userAvatar: avatarFor(values.username),
        content: values.content,
        likes: 0,
        dislikes: 0,
        timestamp: new Date().toISOString(),
        isEdited: false,
      };
      const updated = comments.map((c) =>
        c.id === commentId
          ? { ...c, replies: [...(c.replies || []), reply] }
          : c
      );
      persist(updated);
    },
    [comments, persist]
  );

  return { data, comments, loading, posting, error, addComment, addReply };
};
