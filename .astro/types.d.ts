declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2014_in_review.mdx": {
	id: "2014_in_review.mdx";
  slug: "2014-in-review";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"24-hours-with-threads.mdx": {
	id: "24-hours-with-threads.mdx";
  slug: "24-hours-with-threads";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"astro-image-update.mdx": {
	id: "astro-image-update.mdx";
  slug: "astro-experimental-image-and-mdx-update";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"banning_ie6.mdx": {
	id: "banning_ie6.mdx";
  slug: "banning-ie6";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"font_awesome_is_awesome.mdx": {
	id: "font_awesome_is_awesome.mdx";
  slug: "font-awesome-is-awesome";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"job-search-journey.mdx": {
	id: "job-search-journey.mdx";
  slug: "my-2023-job-search-journey";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"my-2020-react-startup-process.mdx": {
	id: "my-2020-react-startup-process.mdx";
  slug: "my-2020-react-startup-process";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"pie-chart.mdx": {
	id: "pie-chart.mdx";
  slug: "pie-chart";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"quick_ux_no-no.mdx": {
	id: "quick_ux_no-no.mdx";
  slug: "quick-ux-no-no";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"reactjs_tutorial_part_(interlude).mdx": {
	id: "reactjs_tutorial_part_(interlude).mdx";
  slug: "reactjs-tutorial-part-interlude";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"reactjs_tutorial_part_1.mdx": {
	id: "reactjs_tutorial_part_1.mdx";
  slug: "reactjs-tutorial-part-1";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"reactjs_tutorial_part_2.mdx": {
	id: "reactjs_tutorial_part_2.mdx";
  slug: "reactjs-tutorial-part-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"reactjs_tutorial_part_3.mdx": {
	id: "reactjs_tutorial_part_3.mdx";
  slug: "reactjs-tutorial-part-3";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"review-of-spotify-ai-dj.mdx": {
	id: "review-of-spotify-ai-dj.mdx";
  slug: "a-quick-review-of-spotify-ai-dj";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"wtf_recruiters_take_2.mdx": {
	id: "wtf_recruiters_take_2.mdx";
  slug: "wtf-recruiters-take-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
