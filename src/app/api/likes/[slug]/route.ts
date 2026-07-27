import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

const unavailableResponse = () =>
  NextResponse.json({ likes: 0, available: false });

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const supabase = await createClient();

    if (!supabase) {
      return unavailableResponse();
    }

    const { data, error } = await supabase
      .from("post_likes")
      .select("likes")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return NextResponse.json({ likes: data?.likes || 0, available: true });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return unavailableResponse();
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;

  if (!/^[a-z0-9-]{1,120}$/.test(slug)) {
    return NextResponse.json({ error: "Invalid post slug" }, { status: 400 });
  }

  try {
    const body: unknown = await request.json();
    const increment =
      typeof body === "object" &&
      body !== null &&
      "increment" in body &&
      typeof body.increment === "boolean"
        ? body.increment
        : null;

    if (increment === null) {
      return NextResponse.json(
        { error: "A boolean increment value is required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Likes are not configured", available: false },
        { status: 503 },
      );
    }

    const { data: existingData } = await supabase
      .from("post_likes")
      .select("likes")
      .eq("slug", slug)
      .single();

    let newLikes: number;

    if (existingData) {
      newLikes = increment
        ? existingData.likes + 1
        : Math.max(0, existingData.likes - 1);

      const { error } = await supabase
        .from("post_likes")
        .update({ likes: newLikes, updated_at: new Date().toISOString() })
        .eq("slug", slug);

      if (error) throw error;
    } else {
      newLikes = increment ? 1 : 0;

      const { error } = await supabase
        .from("post_likes")
        .insert({ slug, likes: newLikes });

      if (error) throw error;
    }

    return NextResponse.json({ likes: newLikes, available: true });
  } catch (error) {
    console.error("Error updating likes:", error);
    return NextResponse.json(
      { error: "Failed to update likes" },
      { status: 500 },
    );
  }
}
