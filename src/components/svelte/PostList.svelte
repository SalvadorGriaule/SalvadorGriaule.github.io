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
    sorted: Map<number, Map<number, idAndDate[]>> = new Map()
  ) => {
    let currentIter = yearMap[Symbol.iterator]().next().value;

    if (currentIter && yearMap.size != 0) {
      if (sorted.has(currentIter[0])) {
        let currentPosMap = sorted.get(currentIter[0])!;
        currentPosMap.has(currentIter[1][0].date.getMonth())
          ? currentPosMap
              .get(currentIter[1][0].date.getMonth())
              ?.push(currentIter[1][0])
          : currentPosMap.set(currentIter[1][0].date.getMonth(), [
              currentIter[1][0],
            ]);
      } else {
        let monthSort: Map<number, idAndDate[]> = new Map();
        monthSort.set(currentIter[1][0].date.getMonth(), [currentIter[1][0]]);
        sorted.set(currentIter[0], monthSort);
      }
      if (currentIter[1].length > 1) {
        yearMap.set(currentIter[0], yearMap.get(currentIter[0])!.slice(1));
        return sortByMonth(yearMap, sorted);
      }

      yearMap.delete(currentIter[0]);
      return sortByMonth(yearMap, sorted);
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

  const mapDate = sortByMonth(sortByYears(datePosts));

  const dateNow = new Date();
  let currentDate: { year: number; month: number } = $state({
    month: dateNow.getMonth(),
    year: dateNow.getFullYear(),
  });

  const clickYear = (year: number) => {
    currentDate.year == year
      ? (currentDate.year = 0)
      : (currentDate.year = year);
  };

  const clickMonth = (month: number) => {
    currentDate.month == month
      ? (currentDate.month = 0)
      : (currentDate.month = month);
  };
</script>

<div
  class="bg-linear-to-br from-sky-700 to-sky-900 rounded-ss-2xl rounded-ee-2xl w-64 p-2"
>
  <ul>
    {#each mapDate as [k, v], i}
      <li>
        <button
          onclick={() => {
            clickYear(k);
          }}>{k}</button
        >
      </li>
      <ul class="ms-3" style:display={currentDate.year == k ? "block" : "none"}>
        {#each v as [mk, mv], j}
          <button
            onclick={() => {
              clickMonth(mk);
            }}>{mk}</button
          >
          <ul style:display={currentDate.month == mk ? "block" : "none"}>
            {#each mv as post}
              <li class="text-white text-xl font-semibold ps-2.5">
                <a href="/blog/posts/{post.id}"> {post.titre}</a>
              </li>
            {/each}
          </ul>
        {/each}
      </ul>
    {/each}
  </ul>
</div>
