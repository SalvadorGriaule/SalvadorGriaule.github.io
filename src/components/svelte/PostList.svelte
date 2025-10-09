<script lang="ts">
  let { listPost } = $props();

  interface idAndDate {
    date: Date;
    id: number;
    titre: string;
  }

  const datePosts: idAndDate[] = listPost.map((elem) => {
    return {
      date: new Date(elem.frontmatter.date),
      titre: elem.frontmatter.title,
      id: Number(elem.url.slice(elem.url.lastIndexOf("/") + 1)),
    };
  });

  const sortByMonth = (
    yearMap: Map<number, idAndDate[]>,
    sorted: Map<number, Map<number, idAndDate[]>> = new Map(),
    monthSort: Map<number, idAndDate[]> = new Map(),
  ) => {
    let currentIter = yearMap[Symbol.iterator]().next().value
    console.log(currentIter);
    
    if (currentIter) {
      monthSort.has(currentIter[1][0].date.getMonth())
        ? monthSort.get(currentIter[1][0].date.getMonth())?.push(currentIter[1][0])
        : monthSort.set(currentIter[1][0].date.getMonth(), [currentIter[1][0]]);
      sorted.set(currentIter[0], monthSort);
      console.log(currentIter[0],sorted,"sorted",monthSort.entries());
      if (currentIter[1].length > 1) {
        yearMap.set(currentIter[0],yearMap.get(currentIter[0]).slice(1))
        return sortByMonth(yearMap, sorted, monthSort);
      }   
        monthSort.clear()
        yearMap.delete(currentIter[0])
        console.log(sorted,"sorted");
        
        return sortByMonth(yearMap, sorted, monthSort);
    }
    return sorted;
  };

  const sortByYears = (
    arrDate: idAndDate[],
    years: Map<number, idAndDate[]> = new Map()
  ) => {
    years.has(arrDate[0].date.getFullYear())
      ? years.get(arrDate[0].date.getFullYear())?.push(arrDate[0])
      : years.set(arrDate[0].date.getFullYear(), [arrDate[0]]);
    if (arrDate.length > 1) return sortByYears(arrDate.slice(1), years);
    return years;
  };

  const sortBydate = (arrDate: idAndDate[]) => {
    let sort = sortByMonth(sortByYears(arrDate));
  };

  console.log(sortByMonth(sortByYears(datePosts)));
</script>

<div
  class="bg-linear-to-tl from-sky-800 to-sky-950 rounded-ss-2xl rounded-ee-2xl"
>
  {#each listPost as post, i}
    <div class="text-white text-2xl font-semibold px-2.5">
      <a href="/blog/posts/{i + 1}"> {post.frontmatter.title}</a>
    </div>
  {/each}
</div>
