import { Children, cloneElement, isValidElement, ReactNode } from 'react';

type Options = Partial<{
	/**
	 * The maximum depth to descend to. If unspecified, every level of the tree will be visited.
	 *
	 * Zero-based numbering.
	 */
	maxDepth: number;
	/**
	 * The traversal startegy. Defaults to breadth first.
	 *
	 * @remarks
	 * This option is not available for {@link map} or {@link filter}, which always use depth first.
	 */
	visit: 'breadthFirst' | 'depthFirst';
}>;

type MapReturn<T, C> = C extends null | undefined
	? C
	: Array<Exclude<T, boolean | null | undefined>>;

function _map<T, C extends ReactNode>(
	children: C | C[],
	fn: (element: ReactNode) => T,
	maxDepth: number,
	depth: number
): MapReturn<T, C> {
	// @ts-expect-error
	return Children.map(children, (child) => {
		if (isValidElement(child) && child.props.children && depth !== maxDepth) {
			// @ts-expect-error
			child = cloneElement(child, {
				// @ts-expect-error
				children: _map(child.props.children, fn, maxDepth, depth + 1),
			}) as C;
		}

		return fn(child);
	});
}

/**
 * Recursively iterates through all `children` and returns the transformed result of applying `fn` to each child.
 *
 * Recurses depth first, post-order.
 *
 * @param children - the React children.
 * @param fn - the function that will be applied to every child element.
 * @param options - {@link Options}
 *
 */
export function map<T, C extends ReactNode>(
	children: C | C[],
	fn: (element: ReactNode) => T,
	options: Omit<Options, 'visit'> = {}
): MapReturn<T, C> {
	const maxDepth = options['maxDepth'] ?? -1;
	return _map(children, fn, maxDepth, 0);
}
