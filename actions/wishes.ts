"use server";

import { supabase } from "../lib/supabase";
import { Wish } from "../types/Wish";
import { revalidatePath } from "next/cache";

export async function getWishes(): Promise<Wish[]> {
  const { data, error } = await supabase
    .from("wishes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as Wish[];
}

// create a new wish

export async function createWish(name: string, message: string): Promise<Wish> {
  const { data, error } = await supabase
    .from("wishes")
    .insert([{ name: name.trim(), message: message.trim() }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  //revalidatePath("/");
  //revalidatePath("/admin");
  return data as Wish;
}

// update a wish by id

export async function updateWish(
  id: string,
  name: string,
  message: string,
): Promise<Wish> {
  const { data, error } = await supabase
    .from("wishes")
    .update([{ name: name.trim(), message: message.trim() }])
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  // revalidatePath("/");
  // revalidatePath("/admin");
  return data as Wish;
}

// delete a wish by id

export async function deleteWish(id: string): Promise<void> {
  const { error } = await supabase.from("wishes").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  //revalidatePath("/");
  //revalidatePath("/admin");
}
