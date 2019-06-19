<template>
    <div class="col-12 col-lg-10 table-responsive">
        <table class="table table-hover">
            <thead class="text-capitalize text-nowrap">
            <tr>
                <td>{{$t('user.last_name') }}</td>
                <td>{{ $t('user.first_name') }}</td>
                <td>{{ $t('user.username') }}</td>
                <td>{{ $t('user.email') }}</td>
                <td>{{ $t('user.room') }}</td>
                <td>{{ $t('user.house') }}</td>
                <td>{{ $t('user.confirmed') }}</td>
            </tr>
            </thead>
            <tbody class="text-nowrap">
            <tr v-for="user in users">
                <td>{{ user.lastname }}</td>
                <td>{{ user.firstname }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.full_room }}</td>
                <td>{{ user.house }}</td>
                <td>{{ user.confirmed }}</td>
            </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "TableComponent"
    }
</script>

<style scoped>

</style>