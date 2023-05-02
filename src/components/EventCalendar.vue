<script setup>
import {ref, reactive, watch} from 'vue'
import '@fullcalendar/core/vdom';
//Borrar hasta que quede "vue3" en caso de algo
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import useEvents from '../composables/useEvents.js'


const id = ref(10);

const {getEvents, createEvent, updateEvent, deleteEvent} = useEvents();

const options = reactive({
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
        //Botones
        left: 'anterior, siguiente hoy',
        center: 'Título',
        right: 'dayGridMonth, dayGridWeek, listDay'
    },
    //Haciendo posible el seleccionar
    editable: true,
    selectable: true,
    weekends: true,
    select: (arg) => {
        id.value = id.value + 1;

        const cal = arg.view.calendar
        cal.unselect()
        cal.newEvent({
            id: `${id.value}`,
            title: `New event ${id.value}`,
            start: arg.start,
            end: arg.end,
            allDay: true
        })
    },
    //Arrastrar en días distintos para generar un evento
    eventClick: (arg)=> {
        //Borrando
        if(arg.event) {
            arg.event.remove()
        }
    },
    events: [],
    eventAdd: (arg)=> {
        createEvent({
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end,
            allDay: arg.event.allDay
        })
    },
    eventChange: (arg)=> {
        updateEvent({
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end,
            allDay: arg.event.allDay
        }, arg.event.id)
    },
    eventRemove: (arg)=> {
        deleteEvent(arg.event.id)
    }

})

options.events = getEvents.value
watch(getEvents, ()=> {
    options.events = getEvents.value
})
</script>


<template>
    <FullCalendar v-bind:options="options"></FullCalendar>
</template>